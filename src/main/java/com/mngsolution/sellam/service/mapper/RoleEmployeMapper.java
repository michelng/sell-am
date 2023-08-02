package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.RoleEmploye;
import com.mngsolution.sellam.service.dto.RoleEmployeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RoleEmploye} and its DTO {@link RoleEmployeDTO}.
 */
@Mapper(componentModel = "spring")
public interface RoleEmployeMapper extends EntityMapper<RoleEmployeDTO, RoleEmploye> {}
