package com.mngsolution.sellam.service.impl;

import com.mngsolution.sellam.domain.MvtStck;
import com.mngsolution.sellam.repository.MvtStckRepository;
import com.mngsolution.sellam.service.MvtStckService;
import com.mngsolution.sellam.service.dto.MvtStckDTO;
import com.mngsolution.sellam.service.mapper.MvtStckMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link MvtStck}.
 */
@Service
@Transactional
public class MvtStckServiceImpl implements MvtStckService {

    private final Logger log = LoggerFactory.getLogger(MvtStckServiceImpl.class);

    private final MvtStckRepository mvtStckRepository;

    private final MvtStckMapper mvtStckMapper;

    public MvtStckServiceImpl(MvtStckRepository mvtStckRepository, MvtStckMapper mvtStckMapper) {
        this.mvtStckRepository = mvtStckRepository;
        this.mvtStckMapper = mvtStckMapper;
    }

    @Override
    public MvtStckDTO save(MvtStckDTO mvtStckDTO) {
        log.debug("Request to save MvtStck : {}", mvtStckDTO);
        MvtStck mvtStck = mvtStckMapper.toEntity(mvtStckDTO);
        mvtStck = mvtStckRepository.save(mvtStck);
        return mvtStckMapper.toDto(mvtStck);
    }

    @Override
    public MvtStckDTO update(MvtStckDTO mvtStckDTO) {
        log.debug("Request to update MvtStck : {}", mvtStckDTO);
        MvtStck mvtStck = mvtStckMapper.toEntity(mvtStckDTO);
        mvtStck = mvtStckRepository.save(mvtStck);
        return mvtStckMapper.toDto(mvtStck);
    }

    @Override
    public Optional<MvtStckDTO> partialUpdate(MvtStckDTO mvtStckDTO) {
        log.debug("Request to partially update MvtStck : {}", mvtStckDTO);

        return mvtStckRepository
            .findById(mvtStckDTO.getId())
            .map(existingMvtStck -> {
                mvtStckMapper.partialUpdate(existingMvtStck, mvtStckDTO);

                return existingMvtStck;
            })
            .map(mvtStckRepository::save)
            .map(mvtStckMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MvtStckDTO> findAll() {
        log.debug("Request to get all MvtStcks");
        return mvtStckRepository.findAll().stream().map(mvtStckMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<MvtStckDTO> findOne(Long id) {
        log.debug("Request to get MvtStck : {}", id);
        return mvtStckRepository.findById(id).map(mvtStckMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete MvtStck : {}", id);
        mvtStckRepository.deleteById(id);
    }
}
