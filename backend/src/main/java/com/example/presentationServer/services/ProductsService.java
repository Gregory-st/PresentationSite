package com.example.presentationServer.services;

import com.example.presentationServer.entites.ServiceEntity;
import com.example.presentationServer.repositories.ServiceRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductsService {
  private final ServiceRepository serviceRepository;

  public List<ServiceEntity> getAll(){
    return serviceRepository.findAll();
  }
}
