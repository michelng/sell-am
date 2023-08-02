package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Client;
import com.mngsolution.sellam.domain.Facture;
import com.mngsolution.sellam.domain.Vente;
import com.mngsolution.sellam.service.dto.ClientDTO;
import com.mngsolution.sellam.service.dto.FactureDTO;
import com.mngsolution.sellam.service.dto.VenteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Facture} and its DTO {@link FactureDTO}.
 */
@Mapper(componentModel = "spring")
public interface FactureMapper extends EntityMapper<FactureDTO, Facture> {
    @Mapping(target = "vente", source = "vente", qualifiedByName = "venteId")
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    FactureDTO toDto(Facture s);

    @Named("venteId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VenteDTO toDtoVenteId(Vente vente);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);
}
