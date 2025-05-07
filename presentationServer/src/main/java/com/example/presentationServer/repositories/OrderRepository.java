package com.example.presentationServer.repositories;

import java.util.Date;
import java.util.List;
import com.example.presentationServer.entites.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
  List<OrderEntity> findByUserId(long userId);
  List<OrderEntity> findByCreateAt(Date createAt);
}
