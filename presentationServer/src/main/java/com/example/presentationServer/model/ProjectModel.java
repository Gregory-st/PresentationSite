package com.example.presentationServer.model;

import lombok.Setter;
import lombok.Getter;
import java.util.List;
import lombok.NoArgsConstructor;
import com.example.presentationServer.entites.TagEntity;
import com.example.presentationServer.entites.ProjectEntity;
import com.example.presentationServer.entites.ProjectImageEntity;

@Getter
@Setter
@NoArgsConstructor
public class ProjectModel {
  private String endAt;
  private String title;
  private String dates;
  private String[] tags;
  private String startAt;
  private String description;
  private String[] imageUrls;

  public ProjectModel(ProjectEntity entity, List<ProjectImageEntity> imageEntities, List<TagEntity> tagEntities) {
    setTitle(entity.getTitle());
    setEndAt(entity.getEndAt().toString());
    setDescription(entity.getDescription());
    setStartAt(entity.getStartAt().toString());
    setDates(
        getStartAt().split("-")[0]
        + "-"
        + getEndAt().split("-")[0]
    );
    setImageUrls(
        imageEntities.stream()
            .map(ProjectImageEntity::getUrl)
            .toArray(String[]::new)
    );
    setTags(
        tagEntities.stream()
            .map(TagEntity::getTitle)
            .toArray(String[]::new)
    );
  }
}
