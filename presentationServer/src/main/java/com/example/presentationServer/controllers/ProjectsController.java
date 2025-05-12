package com.example.presentationServer.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.example.presentationServer.model.ProjectModel;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.presentationServer.responses.ListResponse;
import com.example.presentationServer.responses.BaseResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.presentationServer.services.ProjectsService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/presentation.site/projects")
public class ProjectsController {
  private final ProjectsService projectsService;
  @GetMapping
  public ResponseEntity<BaseResponse> getAll(){
    ListResponse<ProjectModel> response = new ListResponse<>(
        BaseResponse.getDefaultOk("Успешно"),
        projectsService.getAll()
    );

    return ResponseEntity.ok(response);
  }
}
