package com.mnemos.backend.Repository;

import com.mnemos.backend.Entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface FileRepository extends JpaRepository<File, UUID> {
    List<File> findFileByParentId(UUID parentId);
    @Query(value = "SELECT * FROM files WHERE owner_id = :owner_id", nativeQuery = true)
    List<File> fileFileByOwnerId(@Param("owner_id") UUID ownerId);
}
