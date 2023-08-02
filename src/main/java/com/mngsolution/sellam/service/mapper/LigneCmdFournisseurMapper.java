package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Article;
import com.mngsolution.sellam.domain.CmdFournisseur;
import com.mngsolution.sellam.domain.LigneCmdFournisseur;
import com.mngsolution.sellam.service.dto.ArticleDTO;
import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
import com.mngsolution.sellam.service.dto.LigneCmdFournisseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LigneCmdFournisseur} and its DTO {@link LigneCmdFournisseurDTO}.
 */
@Mapper(componentModel = "spring")
public interface LigneCmdFournisseurMapper extends EntityMapper<LigneCmdFournisseurDTO, LigneCmdFournisseur> {
    @Mapping(target = "cmdFournisseur", source = "cmdFournisseur", qualifiedByName = "cmdFournisseurId")
    @Mapping(target = "article", source = "article", qualifiedByName = "articleId")
    LigneCmdFournisseurDTO toDto(LigneCmdFournisseur s);

    @Named("cmdFournisseurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CmdFournisseurDTO toDtoCmdFournisseurId(CmdFournisseur cmdFournisseur);

    @Named("articleId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ArticleDTO toDtoArticleId(Article article);
}
