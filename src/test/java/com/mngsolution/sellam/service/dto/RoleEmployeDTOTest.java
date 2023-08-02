package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RoleEmployeDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoleEmployeDTO.class);
        RoleEmployeDTO roleEmployeDTO1 = new RoleEmployeDTO();
        roleEmployeDTO1.setId(1L);
        RoleEmployeDTO roleEmployeDTO2 = new RoleEmployeDTO();
        assertThat(roleEmployeDTO1).isNotEqualTo(roleEmployeDTO2);
        roleEmployeDTO2.setId(roleEmployeDTO1.getId());
        assertThat(roleEmployeDTO1).isEqualTo(roleEmployeDTO2);
        roleEmployeDTO2.setId(2L);
        assertThat(roleEmployeDTO1).isNotEqualTo(roleEmployeDTO2);
        roleEmployeDTO1.setId(null);
        assertThat(roleEmployeDTO1).isNotEqualTo(roleEmployeDTO2);
    }
}
