package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.CmdClient;
import com.mngsolution.sellam.repository.CmdClientRepository;
import com.mngsolution.sellam.service.CmdClientService;
import com.mngsolution.sellam.service.dto.CmdClientDTO;
import com.mngsolution.sellam.service.mapper.CmdClientMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CmdClient}.
 */
@Service
@Transactional
public class CmdClientServiceImpl implements CmdClientService {

    private final Logger log = LoggerFactory.getLogger(CmdClientServiceImpl.class);

    private final CmdClientRepository cmdClientRepository;

    private final CmdClientMapper cmdClientMapper;

    public CmdClientServiceImpl(CmdClientRepository cmdClientRepository, CmdClientMapper cmdClientMapper) {
        this.cmdClientRepository = cmdClientRepository;
        this.cmdClientMapper = cmdClientMapper;
    }

    @Override
    public CmdClientDTO save(CmdClientDTO cmdClientDTO) {
        log.debug("Request to save CmdClient : {}", cmdClientDTO);
        CmdClient cmdClient = cmdClientMapper.toEntity(cmdClientDTO);
        cmdClient = cmdClientRepository.save(cmdClient);
        return cmdClientMapper.toDto(cmdClient);
    }

    @Override
    public CmdClientDTO update(CmdClientDTO cmdClientDTO) {
        log.debug("Request to update CmdClient : {}", cmdClientDTO);
        CmdClient cmdClient = cmdClientMapper.toEntity(cmdClientDTO);
        cmdClient = cmdClientRepository.save(cmdClient);
        return cmdClientMapper.toDto(cmdClient);
    }

    @Override
    public Optional<CmdClientDTO> partialUpdate(CmdClientDTO cmdClientDTO) {
        log.debug("Request to partially update CmdClient : {}", cmdClientDTO);

        return cmdClientRepository
            .findById(cmdClientDTO.getId())
            .map(existingCmdClient -> {
                cmdClientMapper.partialUpdate(existingCmdClient, cmdClientDTO);

                return existingCmdClient;
            })
            .map(cmdClientRepository::save)
            .map(cmdClientMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CmdClientDTO> findAll() {
        log.debug("Request to get all CmdClients");
        return cmdClientRepository.findAll().stream().map(cmdClientMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CmdClientDTO> findOne(Long id) {
        log.debug("Request to get CmdClient : {}", id);
        return cmdClientRepository.findById(id).map(cmdClientMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CmdClient : {}", id);
        cmdClientRepository.deleteById(id);
    }
}
