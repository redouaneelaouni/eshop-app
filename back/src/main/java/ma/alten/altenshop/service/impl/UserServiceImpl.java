package ma.alten.altenshop.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.exception.DuplicateEmailException;
import ma.alten.altenshop.exception.UnauthorizedException;
import ma.alten.altenshop.mapper.UserMapper;
import ma.alten.altenshop.model.AuthResponse;
import ma.alten.altenshop.model.LoginRequest;
import ma.alten.altenshop.repository.UserRepository;
import ma.alten.altenshop.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static ma.alten.altenshop.enums.Role.ROLE_USER;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtService jwtService;


    @Override
    public AuthResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }
            String token = jwtService.generateToken(user);

        return userMapper.toAuthResponse(user, token);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("User not authenticated");
        }
        return (User) authentication.getPrincipal();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Could not find user"));
    }

    @Override
    public User createUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateEmailException("Email already exists: " + user.getEmail());
        }

        // Encoder le mot de passe
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(ROLE_USER.name());


        return userRepository.save(user);
    }

}
