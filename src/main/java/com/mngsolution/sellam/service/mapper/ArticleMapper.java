package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.domain.Categorie;
import com.mngsolution.sellam.domain.Magasin;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.dto.CategorieDTO;
import com.mngsolution.sellam.service.dto.MagasinDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring")
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {
    @Mapping(target = "magasin", source = "magasin", qualifiedByName = "magasinId")
    @Mapping(target = "categorie", source = "categorie", qualifiedByName = "categorieId")
    ArticleDTO toDto(Article s);

    @Named("magasinId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    MagasinDTO toDtoMagasinId(Magasin magasin);

    @Named("categorieId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategorieDTO toDtoCategorieId(Categorie categorie);
}
