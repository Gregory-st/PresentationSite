package com.example.presentationServer.services;

import com.example.presentationServer.entites.PartnerEntity;
import com.example.presentationServer.repositories.PartnerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartnerService {
  private final PartnerRepository partnerRepository;

  public List<PartnerEntity> getAll(){
    return partnerRepository.findAll();
  }
}
