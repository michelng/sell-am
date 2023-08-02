package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Client;
import com.mngsolution.sellam.service.dto.ClientDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Client} and its DTO {@link ClientDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDTO, Client> {}
