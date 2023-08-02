package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Employe;
import com.mngsolution.sellam.domain.Entreprise;
import com.mngsolution.sellam.service.dto.EmployeDTO;
import com.mngsolution.sellam.service.dto.EntrepriseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employe} and its DTO {@link EmployeDTO}.
 */
@Mapper(componentModel = "spring")
public interface EmployeMapper extends EntityMapper<EmployeDTO, Employe> {
    @Mapping(target = "entreprise", source = "entreprise", qualifiedByName = "entrepriseId")
    EmployeDTO toDto(Employe s);

    @Named("entrepriseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EntrepriseDTO toDtoEntrepriseId(Entreprise entreprise);
}
