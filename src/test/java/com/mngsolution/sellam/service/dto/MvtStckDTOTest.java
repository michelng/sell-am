package com.mngsolution.sellam.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MvtStckDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MvtStckDTO.class);
        MvtStckDTO mvtStckDTO1 = new MvtStckDTO();
        mvtStckDTO1.setId(1L);
        MvtStckDTO mvtStckDTO2 = new MvtStckDTO();
        assertThat(mvtStckDTO1).isNotEqualTo(mvtStckDTO2);
        mvtStckDTO2.setId(mvtStckDTO1.getId());
        assertThat(mvtStckDTO1).isEqualTo(mvtStckDTO2);
        mvtStckDTO2.setId(2L);
        assertThat(mvtStckDTO1).isNotEqualTo(mvtStckDTO2);
        mvtStckDTO1.setId(null);
        assertThat(mvtStckDTO1).isNotEqualTo(mvtStckDTO2);
    }
}
