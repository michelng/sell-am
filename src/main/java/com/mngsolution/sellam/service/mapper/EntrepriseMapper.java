package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Entreprise;
import com.mngsolution.sellam.service.dto.EntrepriseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Entreprise} and its DTO {@link EntrepriseDTO}.
 */
@Mapper(componentModel = "spring")
public interface EntrepriseMapper extends EntityMapper<EntrepriseDTO, Entreprise> {}
