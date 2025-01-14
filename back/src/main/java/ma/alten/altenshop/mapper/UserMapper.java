package ma.alten.altenshop.mapper;

import ma.alten.altenshop.entity.User;
import ma.alten.altenshop.model.AuthResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "token", source = "token")
    AuthResponse toAuthResponse(User user, String token);
}