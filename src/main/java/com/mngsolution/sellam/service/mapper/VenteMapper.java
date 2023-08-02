package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Client;
import com.mngsolution.sellam.domain.Employe;
import com.mngsolution.sellam.domain.Vente;
import com.mngsolution.sellam.service.dto.ClientDTO;
import com.mngsolution.sellam.service.dto.EmployeDTO;
import com.mngsolution.sellam.service.dto.VenteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Vente} and its DTO {@link VenteDTO}.
 */
@Mapper(componentModel = "spring")
public interface VenteMapper extends EntityMapper<VenteDTO, Vente> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    @Mapping(target = "employe", source = "employe", qualifiedByName = "employeId")
    VenteDTO toDto(Vente s);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);

    @Named("employeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeDTO toDtoEmployeId(Employe employe);
}
