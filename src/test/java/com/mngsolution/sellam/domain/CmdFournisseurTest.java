package com.mngsolution.sellam.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mngsolution.sellam.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CmdFournisseurTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CmdFournisseur.class);
        CmdFournisseur cmdFournisseur1 = new CmdFournisseur();
        cmdFournisseur1.setId(1L);
        CmdFournisseur cmdFournisseur2 = new CmdFournisseur();
        cmdFournisseur2.setId(cmdFournisseur1.getId());
        assertThat(cmdFournisseur1).isEqualTo(cmdFournisseur2);
        cmdFournisseur2.setId(2L);
        assertThat(cmdFournisseur1).isNotEqualTo(cmdFournisseur2);
        cmdFournisseur1.setId(null);
        assertThat(cmdFournisseur1).isNotEqualTo(cmdFournisseur2);
    }
}
