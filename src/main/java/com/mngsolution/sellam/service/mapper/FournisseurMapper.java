package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Fournisseur;
import com.mngsolution.sellam.service.dto.FournisseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Fournisseur} and its DTO {@link FournisseurDTO}.
 */
@Mapper(componentModel = "spring")
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {}
