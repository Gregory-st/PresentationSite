package com.example.presentationServer.services;

import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.presentationServer.dto.AddOrderDto;
import com.example.presentationServer.entites.UserEntity;
import com.example.presentationServer.entites.OrderEntity;
import com.example.presentationServer.repositories.UserRepository;
import com.example.presentationServer.repositories.OrderRepository;

@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orderRepository;
  private final UserRepository userRepository;

  public void addOrder(AddOrderDto orderDto) {
    UserEntity user = userRepository
        .findByEmail(orderDto.email())
        .orElse(new UserEntity());
    OrderEntity order = new OrderEntity();

    if(user.getEmail().isEmpty()){
      user.setName(orderDto.name());
      user.setEmail(orderDto.email());
      user.setPhone(orderDto.phone());
      userRepository.save(user);
    }

    order.setUser(user);
    order.setCreateAt(new Date());
    order.setPrice(orderDto.price());
    order.setDescription(orderDto.description());

    orderRepository.save(order);
  }
}
