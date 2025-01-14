package ma.alten.altenshop.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.model.AuthResponse;
import ma.alten.altenshop.model.LoginRequest;
import ma.alten.altenshop.service.UserService;
import ma.alten.altenshop.service.impl.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static ma.alten.altenshop.constants.RestConstants.LOGIN_PATH;
import static ma.alten.altenshop.constants.RestConstants.ACCOUNT;

@RestController
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    @PostMapping(LOGIN_PATH)
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        AuthResponse user = userService.authenticate(request);
        return ResponseEntity.ok(user);
    }

    @PostMapping(ACCOUNT)
    public ResponseEntity<User> createAccount(@RequestBody @Valid User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
