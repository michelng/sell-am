package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.LigneCmdClient;
import com.mngsolution.sellam.repository.LigneCmdClientRepository;
import com.mngsolution.sellam.service.LigneCmdClientService;
import com.mngsolution.sellam.service.dto.LigneCmdClientDTO;
import com.mngsolution.sellam.service.mapper.LigneCmdClientMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LigneCmdClient}.
 */
@Service
@Transactional
public class LigneCmdClientServiceImpl implements LigneCmdClientService {

    private final Logger log = LoggerFactory.getLogger(LigneCmdClientServiceImpl.class);

    private final LigneCmdClientRepository ligneCmdClientRepository;

    private final LigneCmdClientMapper ligneCmdClientMapper;

    public LigneCmdClientServiceImpl(LigneCmdClientRepository ligneCmdClientRepository, LigneCmdClientMapper ligneCmdClientMapper) {
        this.ligneCmdClientRepository = ligneCmdClientRepository;
        this.ligneCmdClientMapper = ligneCmdClientMapper;
    }

    @Override
    public LigneCmdClientDTO save(LigneCmdClientDTO ligneCmdClientDTO) {
        log.debug("Request to save LigneCmdClient : {}", ligneCmdClientDTO);
        LigneCmdClient ligneCmdClient = ligneCmdClientMapper.toEntity(ligneCmdClientDTO);
        ligneCmdClient = ligneCmdClientRepository.save(ligneCmdClient);
        return ligneCmdClientMapper.toDto(ligneCmdClient);
    }

    @Override
    public LigneCmdClientDTO update(LigneCmdClientDTO ligneCmdClientDTO) {
        log.debug("Request to update LigneCmdClient : {}", ligneCmdClientDTO);
        LigneCmdClient ligneCmdClient = ligneCmdClientMapper.toEntity(ligneCmdClientDTO);
        ligneCmdClient = ligneCmdClientRepository.save(ligneCmdClient);
        return ligneCmdClientMapper.toDto(ligneCmdClient);
    }

    @Override
    public Optional<LigneCmdClientDTO> partialUpdate(LigneCmdClientDTO ligneCmdClientDTO) {
        log.debug("Request to partially update LigneCmdClient : {}", ligneCmdClientDTO);

        return ligneCmdClientRepository
            .findById(ligneCmdClientDTO.getId())
            .map(existingLigneCmdClient -> {
                ligneCmdClientMapper.partialUpdate(existingLigneCmdClient, ligneCmdClientDTO);

                return existingLigneCmdClient;
            })
            .map(ligneCmdClientRepository::save)
            .map(ligneCmdClientMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LigneCmdClientDTO> findAll() {
        log.debug("Request to get all LigneCmdClients");
        return ligneCmdClientRepository
            .findAll()
            .stream()
            .map(ligneCmdClientMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LigneCmdClientDTO> findOne(Long id) {
        log.debug("Request to get LigneCmdClient : {}", id);
        return ligneCmdClientRepository.findById(id).map(ligneCmdClientMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LigneCmdClient : {}", id);
        ligneCmdClientRepository.deleteById(id);
    }
}
