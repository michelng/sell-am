package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Entreprise;
import com.mngsolution.sellam.domain.Magasin;
import com.mngsolution.sellam.service.dto.EntrepriseDTO;
import com.mngsolution.sellam.service.dto.MagasinDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Magasin} and its DTO {@link MagasinDTO}.
 */
@Mapper(componentModel = "spring")
public interface MagasinMapper extends EntityMapper<MagasinDTO, Magasin> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    MagasinDTO toDto(Magasin s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
