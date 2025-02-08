package com.mnemos.backend.Repository;

import com.mnemos.backend.Entity.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SnippetRepository extends JpaRepository<Snippet, UUID> {
    @Query(value = "SELECT * FROM snippets WHERE uid = :uid ORDER BY vector <-> :queryVector LIMIT 5", nativeQuery = true)
    List<Snippet> findSimilarSnippets(@Param("uid") String uid, @Param("queryVector") float[] queryVector);

    Optional<Snippet[]> findSnippetByUid(String uid);

}
