package ma.alten.altenshop.helper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import ma.alten.altenshop.constants.SecurityConstants;
import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.service.impl.JwtService;
import ma.alten.altenshop.service.UserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, java.io.IOException {
        String authHeader = request.getHeader(SecurityConstants.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith(SecurityConstants.BEARER)) {
            String jwt = authHeader.substring(7);
            String email = jwtService.getEmailFromToken(jwt);

            if (email != null) {
                User user = (User) userService.loadUserByUsername(email);

                List<GrantedAuthority> authorities = new ArrayList<>();

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}