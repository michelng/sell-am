package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CmdClientDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmdClientDTO.class);
        CmdClientDTO cmdClientDTO1 = new CmdClientDTO();
        cmdClientDTO1.setId(1L);
        CmdClientDTO cmdClientDTO2 = new CmdClientDTO();
        assertThat(cmdClientDTO1).isNotEqualTo(cmdClientDTO2);
        cmdClientDTO2.setId(cmdClientDTO1.getId());
        assertThat(cmdClientDTO1).isEqualTo(cmdClientDTO2);
        cmdClientDTO2.setId(2L);
        assertThat(cmdClientDTO1).isNotEqualTo(cmdClientDTO2);
        cmdClientDTO1.setId(null);
        assertThat(cmdClientDTO1).isNotEqualTo(cmdClientDTO2);
    }
}
