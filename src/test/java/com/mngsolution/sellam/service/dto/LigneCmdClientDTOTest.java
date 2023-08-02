package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LigneCmdClientDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneCmdClientDTO.class);
        LigneCmdClientDTO ligneCmdClientDTO1 = new LigneCmdClientDTO();
        ligneCmdClientDTO1.setId(1L);
        LigneCmdClientDTO ligneCmdClientDTO2 = new LigneCmdClientDTO();
        assertThat(ligneCmdClientDTO1).isNotEqualTo(ligneCmdClientDTO2);
        ligneCmdClientDTO2.setId(ligneCmdClientDTO1.getId());
        assertThat(ligneCmdClientDTO1).isEqualTo(ligneCmdClientDTO2);
        ligneCmdClientDTO2.setId(2L);
        assertThat(ligneCmdClientDTO1).isNotEqualTo(ligneCmdClientDTO2);
        ligneCmdClientDTO1.setId(null);
        assertThat(ligneCmdClientDTO1).isNotEqualTo(ligneCmdClientDTO2);
    }
}
