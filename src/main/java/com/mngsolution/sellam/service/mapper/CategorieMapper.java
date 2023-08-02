package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Categorie;
import com.mngsolution.sellam.service.dto.CategorieDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Categorie} and its DTO {@link CategorieDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategorieMapper extends EntityMapper<CategorieDTO, Categorie> {}
