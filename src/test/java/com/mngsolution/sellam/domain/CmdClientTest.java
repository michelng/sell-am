package com.mngsolution.sellam.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CmdClientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmdClient.class);
        CmdClient cmdClient1 = new CmdClient();
        cmdClient1.setId(1L);
        CmdClient cmdClient2 = new CmdClient();
        cmdClient2.setId(cmdClient1.getId());
        assertThat(cmdClient1).isEqualTo(cmdClient2);
        cmdClient2.setId(2L);
        assertThat(cmdClient1).isNotEqualTo(cmdClient2);
        cmdClient1.setId(null);
        assertThat(cmdClient1).isNotEqualTo(cmdClient2);
    }
}
