package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.CmdFournisseur;
import com.mngsolution.sellam.repository.CmdFournisseurRepository;
import com.mngsolution.sellam.service.CmdFournisseurService;
import com.mngsolution.sellam.service.dto.CmdFournisseurDTO;
import com.mngsolution.sellam.service.mapper.CmdFournisseurMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CmdFournisseur}.
 */
@Service
@Transactional
public class CmdFournisseurServiceImpl implements CmdFournisseurService {

    private final Logger log = LoggerFactory.getLogger(CmdFournisseurServiceImpl.class);

    private final CmdFournisseurRepository cmdFournisseurRepository;

    private final CmdFournisseurMapper cmdFournisseurMapper;

    public CmdFournisseurServiceImpl(CmdFournisseurRepository cmdFournisseurRepository, CmdFournisseurMapper cmdFournisseurMapper) {
        this.cmdFournisseurRepository = cmdFournisseurRepository;
        this.cmdFournisseurMapper = cmdFournisseurMapper;
    }

    @Override
    public CmdFournisseurDTO save(CmdFournisseurDTO cmdFournisseurDTO) {
        log.debug("Request to save CmdFournisseur : {}", cmdFournisseurDTO);
        CmdFournisseur cmdFournisseur = cmdFournisseurMapper.toEntity(cmdFournisseurDTO);
        cmdFournisseur = cmdFournisseurRepository.save(cmdFournisseur);
        return cmdFournisseurMapper.toDto(cmdFournisseur);
    }

    @Override
    public CmdFournisseurDTO update(CmdFournisseurDTO cmdFournisseurDTO) {
        log.debug("Request to update CmdFournisseur : {}", cmdFournisseurDTO);
        CmdFournisseur cmdFournisseur = cmdFournisseurMapper.toEntity(cmdFournisseurDTO);
        cmdFournisseur = cmdFournisseurRepository.save(cmdFournisseur);
        return cmdFournisseurMapper.toDto(cmdFournisseur);
    }

    @Override
    public Optional<CmdFournisseurDTO> partialUpdate(CmdFournisseurDTO cmdFournisseurDTO) {
        log.debug("Request to partially update CmdFournisseur : {}", cmdFournisseurDTO);

        return cmdFournisseurRepository
            .findById(cmdFournisseurDTO.getId())
            .map(existingCmdFournisseur -> {
                cmdFournisseurMapper.partialUpdate(existingCmdFournisseur, cmdFournisseurDTO);

                return existingCmdFournisseur;
            })
            .map(cmdFournisseurRepository::save)
            .map(cmdFournisseurMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CmdFournisseurDTO> findAll() {
        log.debug("Request to get all CmdFournisseurs");
        return cmdFournisseurRepository
            .findAll()
            .stream()
            .map(cmdFournisseurMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CmdFournisseurDTO> findOne(Long id) {
        log.debug("Request to get CmdFournisseur : {}", id);
        return cmdFournisseurRepository.findById(id).map(cmdFournisseurMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmdFournisseur : {}", id);
        cmdFournisseurRepository.deleteById(id);
    }
}
