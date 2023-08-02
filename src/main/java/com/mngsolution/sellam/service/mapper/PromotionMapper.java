package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Promotion;
import com.mngsolution.sellam.service.dto.PromotionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Promotion} and its DTO {@link PromotionDTO}.
 */
@Mapper(componentModel = "spring")
public interface PromotionMapper extends EntityMapper<PromotionDTO, Promotion> {}
