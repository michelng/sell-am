package com.mngsolution.sellam.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MvtStckTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MvtStck.class);
        MvtStck mvtStck1 = new MvtStck();
        mvtStck1.setId(1L);
        MvtStck mvtStck2 = new MvtStck();
        mvtStck2.setId(mvtStck1.getId());
        assertThat(mvtStck1).isEqualTo(mvtStck2);
        mvtStck2.setId(2L);
        assertThat(mvtStck1).isNotEqualTo(mvtStck2);
        mvtStck1.setId(null);
        assertThat(mvtStck1).isNotEqualTo(mvtStck2);
    }
}
