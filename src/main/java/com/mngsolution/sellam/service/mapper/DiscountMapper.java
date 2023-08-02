package com.mngsolution.sellam.service.mapper;

import com.mngsolution.sellam.domain.Discount;
import com.mngsolution.sellam.service.dto.DiscountDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discount} and its DTO {@link DiscountDTO}.
 */
@Mapper(componentModel = "spring")
public interface DiscountMapper extends EntityMapper<DiscountDTO, Discount> {}
