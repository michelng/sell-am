package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LigneCmdFournisseurDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneCmdFournisseurDTO.class);
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO1 = new LigneCmdFournisseurDTO();
        ligneCmdFournisseurDTO1.setId(1L);
        LigneCmdFournisseurDTO ligneCmdFournisseurDTO2 = new LigneCmdFournisseurDTO();
        assertThat(ligneCmdFournisseurDTO1).isNotEqualTo(ligneCmdFournisseurDTO2);
        ligneCmdFournisseurDTO2.setId(ligneCmdFournisseurDTO1.getId());
        assertThat(ligneCmdFournisseurDTO1).isEqualTo(ligneCmdFournisseurDTO2);
        ligneCmdFournisseurDTO2.setId(2L);
        assertThat(ligneCmdFournisseurDTO1).isNotEqualTo(ligneCmdFournisseurDTO2);
        ligneCmdFournisseurDTO1.setId(null);
        assertThat(ligneCmdFournisseurDTO1).isNotEqualTo(ligneCmdFournisseurDTO2);
    }
}
