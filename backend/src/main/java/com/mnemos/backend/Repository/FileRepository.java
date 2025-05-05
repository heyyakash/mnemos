package com.mnemos.backend.Repository;

import com.mnemos.backend.Entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FileRepository extends JpaRepository<File, UUID> {
    List<File> findFileByParentId(UUID parentId);
    @Query(value = "SELECT * FROM files WHERE owner_id = :owner_id", nativeQuery = true)
    List<File> findFileByOwnerId(@Param("owner_id") UUID ownerId);

    @Query(value = "SELECT id FROM files WHERE is_root = TRUE AND is_folder = TRUE AND owner_id = :owner_id", nativeQuery = true)
    UUID findRootFolderByOwnerId(@Param("owner_id") UUID ownerId);


    @Query(value = "SELECT * FROM files WHERE id = :id AND is_folder = TRUE AND owner_id = :owner_id", nativeQuery = true)
    Optional<File> findFolderByIdandUID(@Param("id") UUID id, @Param("owner_id") UUID ownerId);

    @Query(value = "SELECT * FROM files WHERE id = :id  AND owner_id = :owner_id", nativeQuery = true)
    Optional<File> findFileByIdandUID(@Param("id") UUID id, @Param("owner_id") UUID ownerId);


    @Query(value = "SELECT * FROM files WHERE parent_id = :parent_id AND owner_id = :owner_id AND archived = FALSE", nativeQuery = true)
    List<File> findFilesByFolderId(@Param("parent_id") UUID parent_id, @Param("owner_id") UUID ownerId);

    @Query(value = "SELECT * FROM files WHERE :labelId = ANY(label)", nativeQuery = true)
    List<File> findByLabelId(@Param("labelId") UUID labelId);

    Optional<File> findFileBySnippetId(UUID snippetId);

}
