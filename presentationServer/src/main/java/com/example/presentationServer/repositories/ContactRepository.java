package com.example.presentationServer.repositories;

import java.util.Optional;
import com.example.presentationServer.entites.ContactEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
  Optional<ContactEntity> findByPhone(String phone);
  Optional<ContactEntity> findByEmail(String email);

  Optional<ContactEntity> findFirstByOrder(Integer order);
}
