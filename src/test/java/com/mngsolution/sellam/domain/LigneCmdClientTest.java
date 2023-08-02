package com.mngsolution.sellam.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LigneCmdClientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LigneCmdClient.class);
        LigneCmdClient ligneCmdClient1 = new LigneCmdClient();
        ligneCmdClient1.setId(1L);
        LigneCmdClient ligneCmdClient2 = new LigneCmdClient();
        ligneCmdClient2.setId(ligneCmdClient1.getId());
        assertThat(ligneCmdClient1).isEqualTo(ligneCmdClient2);
        ligneCmdClient2.setId(2L);
        assertThat(ligneCmdClient1).isNotEqualTo(ligneCmdClient2);
        ligneCmdClient1.setId(null);
        assertThat(ligneCmdClient1).isNotEqualTo(ligneCmdClient2);
    }
}
