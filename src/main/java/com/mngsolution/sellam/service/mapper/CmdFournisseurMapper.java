package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.CmdFournisseur;
import com.mngsolution.sellam.domain.Fournisseur;
import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
import com.mngsolution.sellam.service.dto.FournisseurDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CmdFournisseur} and its DTO {@link CmdFournisseurDTO}.
 */
@Mapper(componentModel = "spring")
public interface CmdFournisseurMapper extends EntityMapper<CmdFournisseurDTO, CmdFournisseur> {
    @Mapping(target = "fournisseur", source = "fournisseur", qualifiedByName = "fournisseurId")
    CmdFournisseurDTO toDto(CmdFournisseur s);

    @Named("fournisseurId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FournisseurDTO toDtoFournisseurId(Fournisseur fournisseur);
}
