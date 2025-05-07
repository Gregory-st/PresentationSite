package com.example.presentationServer.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.presentationServer.entites.LinksContactEntity;

public interface LinksContactRepository extends JpaRepository<LinksContactEntity, Long> {
  List<LinksContactEntity> findAllByContactId(long contactId);
}
