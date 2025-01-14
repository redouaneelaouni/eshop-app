package ma.alten.altenshop.constants;

public class SecurityConstants {

    public static final String ROLE_ADMIN = "'ADMIN'";
    public static final String ROLE_USER = "'USER'";
    public static final String BEARER = "Bearer ";
    public static final String AUTHORIZATION = "Authorization";

    private SecurityConstants() {
        throw new IllegalStateException("Utility class");
    }
}
