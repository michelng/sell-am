package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.domain.MvtStck;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.dto.MvtStckDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MvtStck} and its DTO {@link MvtStckDTO}.
 */
@Mapper(componentModel = "spring")
public interface MvtStckMapper extends EntityMapper<MvtStckDTO, MvtStck> {
    @Mapping(target = "article", source = "article", qualifiedByName = "articleId")
    MvtStckDTO toDto(MvtStck s);

    @Named("articleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArticleDTO toDtoArticleId(Article article);
}
