package com.example.presentationServer.repositories;

import com.example.presentationServer.entites.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
}
