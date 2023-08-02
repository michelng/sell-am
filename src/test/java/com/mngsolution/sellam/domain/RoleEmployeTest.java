package com.mngsolution.sellam.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RoleEmployeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoleEmploye.class);
        RoleEmploye roleEmploye1 = new RoleEmploye();
        roleEmploye1.setId(1L);
        RoleEmploye roleEmploye2 = new RoleEmploye();
        roleEmploye2.setId(roleEmploye1.getId());
        assertThat(roleEmploye1).isEqualTo(roleEmploye2);
        roleEmploye2.setId(2L);
        assertThat(roleEmploye1).isNotEqualTo(roleEmploye2);
        roleEmploye1.setId(null);
        assertThat(roleEmploye1).isNotEqualTo(roleEmploye2);
    }
}
