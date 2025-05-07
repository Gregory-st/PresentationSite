package com.example.presentationServer.repositories;

import com.example.presentationServer.entites.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
}
