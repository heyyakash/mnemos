package com.mnemos.backend.Repository;

import com.mnemos.backend.Entity.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    @Query(value = "SELECT * FROM snippets WHERE email = :email ORDER BY vector <-> :queryVector LIMIT 5", nativeQuery = true)
    List<Snippet> findSimilarSnippets(@Param("email") String email, @Param("queryVector") float[] queryVector);

    Optional<Snippet[]> findSnippetByEmail(String email);

}
