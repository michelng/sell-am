package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.domain.LigneVente;
import com.mngsolution.sellam.domain.Vente;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.dto.LigneVenteDTO;
import com.mngsolution.sellam.service.dto.VenteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LigneVente} and its DTO {@link LigneVenteDTO}.
 */
@Mapper(componentModel = "spring")
public interface LigneVenteMapper extends EntityMapper<LigneVenteDTO, LigneVente> {
    @Mapping(target = "vente", source = "vente", qualifiedByName = "venteId")
    @Mapping(target = "article", source = "article", qualifiedByName = "articleId")
    LigneVenteDTO toDto(LigneVente s);

    @Named("venteId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VenteDTO toDtoVenteId(Vente vente);

    @Named("articleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArticleDTO toDtoArticleId(Article article);
}
