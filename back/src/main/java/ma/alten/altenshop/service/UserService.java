package ma.alten.altenshop.service;

import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.model.AuthResponse;
import ma.alten.altenshop.model.LoginRequest;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User getCurrentUser();
    AuthResponse authenticate(LoginRequest loginRequest);
    User createUser(User user);
}
