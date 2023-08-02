package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CmdFournisseurDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmdFournisseurDTO.class);
        CmdFournisseurDTO cmdFournisseurDTO1 = new CmdFournisseurDTO();
        cmdFournisseurDTO1.setId(1L);
        CmdFournisseurDTO cmdFournisseurDTO2 = new CmdFournisseurDTO();
        assertThat(cmdFournisseurDTO1).isNotEqualTo(cmdFournisseurDTO2);
        cmdFournisseurDTO2.setId(cmdFournisseurDTO1.getId());
        assertThat(cmdFournisseurDTO1).isEqualTo(cmdFournisseurDTO2);
        cmdFournisseurDTO2.setId(2L);
        assertThat(cmdFournisseurDTO1).isNotEqualTo(cmdFournisseurDTO2);
        cmdFournisseurDTO1.setId(null);
        assertThat(cmdFournisseurDTO1).isNotEqualTo(cmdFournisseurDTO2);
    }
}
