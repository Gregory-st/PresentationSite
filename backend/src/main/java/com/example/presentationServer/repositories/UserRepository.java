package com.example.presentationServer.repositories;

import java.util.Optional;
import com.example.presentationServer.entites.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByEmail(String email);
  Optional<UserEntity> findByPhone(String phone);
}
