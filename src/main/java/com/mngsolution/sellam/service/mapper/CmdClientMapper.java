package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Client;
import com.mngsolution.sellam.domain.CmdClient;
import com.mngsolution.sellam.service.dto.ClientDTO;
import com.mngsolution.sellam.service.dto.CmdClientDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CmdClient} and its DTO {@link CmdClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface CmdClientMapper extends EntityMapper<CmdClientDTO, CmdClient> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientId")
    CmdClientDTO toDto(CmdClient s);

    @Named("clientId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientDTO toDtoClientId(Client client);
}
