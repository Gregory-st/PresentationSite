package com.example.presentationServer.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.presentationServer.entites.CompanyEntity;
import com.example.presentationServer.repositories.CompanyRepository;

@Service
@RequiredArgsConstructor
public class CompanyService {
  private final CompanyRepository companyRepository;

  public CompanyEntity getCompany() {
    return companyRepository
        .findAll()
        .get(0);
  }
}
