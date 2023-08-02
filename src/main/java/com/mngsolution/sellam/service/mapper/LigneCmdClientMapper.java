package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.domain.CmdClient;
import com.mngsolution.sellam.domain.LigneCmdClient;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.dto.CmdClientDTO;
import com.mngsolution.sellam.service.dto.LigneCmdClientDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LigneCmdClient} and its DTO {@link LigneCmdClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface LigneCmdClientMapper extends EntityMapper<LigneCmdClientDTO, LigneCmdClient> {
    @Mapping(target = "cmdClient", source = "cmdClient", qualifiedByName = "cmdClientId")
    @Mapping(target = "article", source = "article", qualifiedByName = "articleId")
    LigneCmdClientDTO toDto(LigneCmdClient s);

    @Named("cmdClientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CmdClientDTO toDtoCmdClientId(CmdClient cmdClient);

    @Named("articleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArticleDTO toDtoArticleId(Article article);
}
